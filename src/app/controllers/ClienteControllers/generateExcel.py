from copy import deepcopy
import pandas
import sys
import json
import math
import random

data = json.loads(sys.argv[1])

path_to_save = 'src/app/controllers/ClienteControllers/excelFiles/excel' + sys.argv[2].replace("\"", "") +'.xlsx'
def cross_join(left, right):
    new_rows = [] if right else left
    for left_row in left:
        for right_row in right:
            temp_row = deepcopy(left_row)
            for key, value in right_row.items():
                temp_row[key] = value
            new_rows.append(deepcopy(temp_row))
    return new_rows


def flatten_list(data):
    for elem in data:
        if isinstance(elem, list):
            yield from flatten_list(elem)
        else:
            yield elem


def json_to_dataframe(data_in):
    def flatten_json(data, prev_heading=''):
        if isinstance(data, dict):
            rows = [{}]
            for key, value in data.items():
                rows = cross_join(rows, flatten_json(value, prev_heading + '.' + key))
        elif isinstance(data, list):
            rows = []
            for i in range(len(data)):
                [rows.append(elem) for elem in flatten_list(flatten_json(data[i], prev_heading))]
        else:
            rows = [{prev_heading[1:]: data}]
        return rows

    return pandas.DataFrame(flatten_json(data_in))

df = json_to_dataframe(data)
df.to_excel(path_to_save,header=[
    'CNPJ',
    'Nome Abreviado',
    'Razão Social',
    'Telefone',
    'Site',
    'Atividade Principal',
    'Ramo',
    'Setor',
    'ERP',
    'Banco de Dados',
    'Quantidade de Funcionários',
    'Bairro',
    'Cidade',
    'UF',
    'Código',
    'Descrição',
    'Entrada Campanha',
    'Situação',
    'Colaborador',
    'Data Contato',
    'Contato',
    'Cargo Contato',
    'Email Contato',
    'Preferência de Contato',
    'Reação',
    'Próximo Passo',
    'Data Próximo Contato',
    'Detalhes',
    'Motivo Código',
    'Motivo',
])
