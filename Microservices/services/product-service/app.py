#!/usr/bin/env python
# -*- coding: utf-8 -*- 
from flask import Flask, request, jsonify
import requests

app = Flask(__name__)
elastic_url = 'http://product-db:9200/fastcommerce/products'


def renderSuccess(message, data):
    return jsonify({'message': message, 'success': True, 'data:': data})


def renderError(message):
    return jsonify({'message': message, 'success': False})


def createProduct(product):
    response = requests.post(elastic_url, json=product)
    if 'error' in response.json():
        return renderError(response.json())
    return renderSuccess('Le produit a bien été ajouté !', response.json())


def deleteProducts():
    response = requests.delete(elastic_url)
    if 'error' in response.json():
        return renderError(response.json())
    return renderSuccess('Les produits ont été supprimés', response.json())


def deleteProduct(id):
    response = requests.delete(elastic_url + '/' + id)
    if 'error' in response.json():
        return renderError(response.json())
    return renderSuccess('Le produit a été supprimé', response.json())


def getAllProducts():
    response = requests.post(elastic_url + "/_search", json={
        'query': {
            'match_all': {}
        }
    })
    if 'error' in response.json():
        return renderError(response.json())

    return renderSuccess(None, response.json()['hits'])


def filterProducts(field, order):
    response = requests.post(elastic_url + "/_search", json={
        "sort": [
            {
                field: {'order': order}
            }
        ],
        "query": {
            'match_all': {}
        }
    })
    if 'error' in response.json():
        return renderError(response.json())

    return renderSuccess(None, response.json()['hits'])


def searchProducts(query):
    response = requests.post(elastic_url + '/_search', json={
        "query": {
            "multi_match": {
                "query": query,
                "fields": ["name", "brand", "category"]
            }
        }
    })
    print({
        'query': {
            'match': {
                'name': {
                    'query': query,
                    "fuzziness": "AUTO"
                }
            }
        }
    })
    if 'error' in response.json():
        return renderError(response.json())

    return response.json()


@app.route('/', methods=['GET', 'POST', 'DELETE'])
def index():
    response = {}
    if request.method == 'POST':
        response = createProduct(request.json)
        return response
    elif request.method == 'DELETE':
        response = deleteProducts()

    return response


@app.route('/<id>', methods=['GET', 'DELETE'])
def product(id):
    response = {}
    if request.method == 'DELETE':
        response = deleteProduct(id)
        return response


@app.route('/all', methods=['GET'])
def searchAll():
    response = getAllProducts()
    return response


@app.route('/filter', methods=['POST'])
def filter():
    body = request.json
    response = filterProducts(body['field'], body['order'])
    print(response)
    return response


@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('query')
    response = searchProducts(query)
    return response


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=False, port='5005')
