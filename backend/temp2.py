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
    car_id = list(names)[list(names.values()).index('car')]
    truck_id = list(names)[list(names.values()).index('truck')]
    car_no = results[0].boxes.cls.tolist().count(car_id)
    truck_no = results[0].boxes.cls.tolist().count(truck_id)
    obj_dict['cars'] = car_no
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

image = cv2.imread('highwayjpg.jpg')
predicted_image, objects = predict(image)
print(objects)