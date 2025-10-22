import os
from flask import Flask, request, render_template, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
# from tensorflow.python.keras.utils import legacy_h5_format
from tensorflow.keras.applications.imagenet_utils import preprocess_input
import numpy as np
app = Flask(__name__)
model = None

def load_pneumonia_model():
    global model
    model_path = 'models/pneumonia_detection_model.h5'
    model = load_model(model_path)
    print('Model loaded.')

# Load the model when the application starts
load_pneumonia_model()

@app.route('/')
def index():
    video_path = 'static/videos/pnemonia.mp4'
    return render_template('index.html', video_path=video_path)

@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':

        if 'file' not in request.files:
            return jsonify(error='No file uploaded.')
          
        image_file = request.files['file']
        if image_file.filename == '':
            return jsonify(error='No file selected.')

        file_path = os.path.join(app.root_path, 'temp.jpg')
        image_file.save(file_path)
        x=1.786
        img = image.load_img(file_path, target_size=(64, 64))
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        img_array = preprocess_input(img_array)

        prediction = model.predict(img_array)
        result = prediction[0][0]

        if result > 0.7:
            prediction_result = 'Pneumonia'
            accuracy_percentage = ((result * 100)-x)
        else:
            prediction_result = 'Normal'
            accuracy_percentage = (((1 - result) * 100)-x)

        os.remove(file_path)  # Clean up the temporary file

        return render_template('result.html', prediction_result=prediction_result, accuracy_percentage=accuracy_percentage)

    return jsonify(error='Invalid request.')

if __name__ == '__main__':
    app.run(debug=True, host="127.0.0.1", port=8002)