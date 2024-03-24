import cv2
from ultralytics import YOLO
from ultralytics.utils.plotting import Annotator  

# model = YOLO('model/best.pt')
model = YOLO("./model/yolov8n.pt")
# 1: 'bicycle', 2: 'car', 3: 'motorcycle', 4: 'airplane', 5: 'bus', 7: 'truck'
classes = [1,2,3,5,7]
conf_thres = 0.25

img = cv2.imread('highwayjpg.jpg')
# cv2.imshow('image', img)

results = model.predict(source=img, classes = classes, conf=conf_thres)
names = model.names
car_id = list(names)[list(names.values()).index('car')]
truck_id = list(names)[list(names.values()).index('truck')]
print("cars: ", results[0].boxes.cls.tolist().count(car_id))
print("trucks: ", results[0].boxes.cls.tolist().count(truck_id))

for r in results:
  for r in results:
    annotator = Annotator(img)
    boxes = r.boxes
    for box in boxes:
        b = box.xyxy[0]  # get box coordinates in (left, top, right, bottom) format
        c = box.cls
        annotator.box_label(b, model.names[int(c)])
  img = annotator.result()
  cv2.imshow('YOLO V8 Detection', img)     

cv2.waitKey(0)
cv2.destroyAllWindows()