from app import app
from flask import Flask, request, jsonify
import numpy as np
from PIL import Image
import io
import base64
import cv2
from ultralytics import YOLO
from ultralytics.utils.plotting import Annotator

model = YOLO("./model/yolov8n.pt")
classes = [1,2,3,5,7]
conf_thres = 0.25

def predict(image):
    obj_dict = {}
    img = np.array(image)
    results = model.predict(source=img, classes = classes, conf=conf_thres)
    
    names = model.names
    bicycle_id = list(names)[list(names.values()).index('bicycle')]
    car_id = list(names)[list(names.values()).index('car')]
    motorcycle_id = list(names)[list(names.values()).index('motorcycle')]
    bus_id = list(names)[list(names.values()).index('bus')]
    
    truck_id = list(names)[list(names.values()).index('truck')]
    bicycle_no = results[0].boxes.cls.tolist().count(bicycle_id)
    car_no = results[0].boxes.cls.tolist().count(car_id)
    motorcycle_no = results[0].boxes.cls.tolist().count(motorcycle_id)
    bus_no = results[0].boxes.cls.tolist().count(bus_id)
    truck_no = results[0].boxes.cls.tolist().count(truck_id)
    
    obj_dict['bicycles'] = bicycle_no
    obj_dict['cars'] = car_no
    obj_dict['motorcycles'] = motorcycle_no
    obj_dict['buses'] = bus_no
    obj_dict['trucks'] = truck_no
    
    for r in results:
        annotator = Annotator(img)
        boxes = r.boxes
        for box in boxes:
            b = box.xyxy[0]  # get box coordinates in (left, top, right, bottom) format
            c = box.cls
            annotator.box_label(b, model.names[int(c)])
    img = annotator.result()
    return img, obj_dict

@app.route('/')
@app.route('/index')
def index():
    return "Hello, World!"

@app.route('/predict', methods=['POST'])
def predict_route():
    uploaded_files = request.files.getlist("images")
    if uploaded_files is None or uploaded_files == []:
        return jsonify({'error': uploaded_files})

    try:
        predicted = []
        for file in uploaded_files:
            image = Image.open(io.BytesIO(file.read()))
            predicted_image, objects = predict(image)
            
            img_byte_arr = io.BytesIO()
            predicted_image = Image.fromarray(predicted_image)
            predicted_image.save(img_byte_arr, format='PNG')
            img_byte_arr = img_byte_arr.getvalue()
            img_base64 = base64.b64encode(img_byte_arr).decode('utf-8')
            predicted.append([img_base64, objects])

        return jsonify({'predicted': predicted})

    except Exception as e:
        return jsonify({'error': str(e)})