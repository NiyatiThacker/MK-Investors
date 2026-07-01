import os, pathlib
from dotenv import load_dotenv
load_dotenv(pathlib.Path('.env'))
import requests

api_key = os.getenv('GEMINI_API_KEY')
url = f'https://generativelanguage.googleapis.com/v1beta/models?key={api_key}'
response = requests.get(url)

print('Status:', response.status_code)
if response.status_code == 200:
    models = response.json().get('models', [])
    print('Available Models:')
    for m in models:
        methods = m.get('supportedGenerationMethods', [])
        if 'generateContent' in methods:
            print(f"- {m.get('name')}")
else:
    print('Error:', response.text)
