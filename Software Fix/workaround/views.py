from django.shortcuts import render
from pymongo import MongoClient
import random


client = MongoClient(
    "mongodb+srv://ushita:ushita26@cluster0-s5zz8.mongodb.net/test?retryWrites=true&w=majority")
db = client.test
collection = db.items

# Home Page with Start Button


def button(request):
    return render(request, 'home.html')

# Initial state of shelf


def output(request):
    res = collection.find_one({"machine_no": 1})
    return render(request, 'home.html', {"data": res, "data1": "initial"})

# Reduce stock below threshold


def lower(request):
    res = collection.find_one({"machine_no": 1})
    num1 = random.randrange(120, 1200, 120)

    result = collection.update_one(
        {"machine_no": 1}, {"$set": {"current_weight": num1}})

    doc = collection.find_one({"machine_no": 1})
    print(doc)
    return render(request, 'home.html', {"data2": doc, "data": res, "data1": "low"})

# Increase stock above threshold


def increase(request):
    res = collection.find_one({"machine_no": 1})
    num2 = random.randrange(1200, 6000, 120)

    result = collection.update_one(
        {"machine_no": 1}, {"$set": {"current_weight": num2}})

    doc = collection.find_one({"machine_no": 1})
    print(doc)
    return render(request, 'home.html', {"data2": doc, "data": res, "data1": "high"})
