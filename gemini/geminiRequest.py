from flask import Flask, request
from werkzeug.utils import secure_filename
import os
from pathlib import Path
import hashlib
import google.generativeai as genai
from flask_cors import CORS
from PyPDF2 import PdfReader



app = Flask(__name__)
CORS(app)


UPLOAD_FOLDER = './uploads/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Create the directory if it does not exist
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

genai.configure(api_key="YOUR_API_KEY")

# Set up the model
generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 0,
    "max_output_tokens": 8192,
}

safety_settings = [
    {
        "category": "HARM_CATEGORY_HARASSMENT",
        "threshold": "BLOCK_NONE"
    },
    {
        "category": "HARM_CATEGORY_HATE_SPEECH",
        "threshold": "BLOCK_NONE"
    },
    {
        "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        "threshold": "BLOCK_NONE"
    },
    {
        "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
        "threshold": "BLOCK_NONE"
    },
]

model = genai.GenerativeModel(model_name="gemini-1.5-pro-latest",
                                                            generation_config=generation_config,
                                                            safety_settings=safety_settings)
def extract_pdf_pages(pathname: str) -> list[str]:
    parts = [f"--- START OF PDF {pathname} ---"]

    # Create a PDF file reader object
    pdf_reader = PdfReader(pathname)

    # Loop through each page in the PDF
    for index, page in enumerate(pdf_reader.pages):
        # Extract the text from the page
        text = page.extract_text()
        parts.append(f"--- PAGE {index} ---")
        parts.append(text)

    return parts

@app.route('/api/generateContent', methods=['POST'])
def generate_content():
    try:
        if 'file' not in request.files:
            return 'No file part'
        file = request.files['file']
        if file.filename == '':
            return 'No selected file'
        if file:
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            topic = request.form.get('topic')
            api_key = request.form.get('api_key')  # Get the API key from the request
            genai.configure(api_key=api_key)  # Configure the API key
            prompt_parts = [
                "From this book only",
                *extract_pdf_pages(os.path.join(app.config['UPLOAD_FOLDER'], filename)),
                f" Explain this :{topic}",
            ]
            response = model.generate_content(prompt_parts)
            print(response)
            return response.text
    except Exception as e:
        print(e)  # Print the error message to the console for debugging
        return 'Something went wrong please try again or try resetting the API key'

if __name__ == '__main__':
        app.run(debug=True)