from copy import deepcopy
import pandas
import sys
import json
from pathlib import Path
import os

today = sys.argv[1]
path_to_json = Path('./excelFiles/cliMappedData'+ today +'.json').resolve()
path_to_xlsx = Path('./excelFiles/excel' + today +'.xlsx').resolve()
with open (path_to_json, encoding='utf-8') as json_file:
  data = json.load(json_file)

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
tableHeaders=[
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
    'Status Empresa',
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
]
df.to_excel(path_to_xlsx,header=tableHeaders[0:len(df.columns)])
