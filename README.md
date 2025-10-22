# Step 0: Move or delete nested Git folder if exists
if (Test-Path "pnemonia-detection-with-cnn") { Move-Item "pnemonia-detection-with-cnn" "D:\Backup\" }

# Step 1: Create .gitignore
@"
# Python
__pycache__/
*.pyc
*.pyo
*.pyd
env/
venv/
app_venv/

# Jupyter
.ipynb_checkpoints/

# OS
.DS_Store
Thumbs.db

# Dataset / large files
*.h5
*.csv
*.zip
"@ | Out-File -Encoding UTF8 .gitignore

# Step 2: Create README.md
@"
# Pneumonia Detection Using CNN

This project implements a Convolutional Neural Network (CNN) to detect pneumonia from chest X-ray images.

## Features
- Detects pneumonia in chest X-ray images
- Uses a deep learning CNN model
- Provides training and testing scripts
- Clean folder structure for scalability

## Installation
1. Clone the repository
\`\`\`bash
git clone https://github.com/MikoCodes92/pnemonia-detection-with-cnn.git
\`\`\`
2. Create a virtual environment
\`\`\`bash
python -m venv app_venv
\`\`\`
3. Install dependencies
\`\`\`bash
pip install -r requirements.txt
\`\`\`

## Usage
\`\`\`bash
python app.py
\`\`\`

## Folder Structure
\`\`\`
app.py
models/              
static/              
templates/           
util.py              
Testing-Data/        
\`\`\`
