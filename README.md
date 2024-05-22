## Installation

```
python3 -m pip install flask
```

## Usage

```
app_local: python3 app_local.py
app.py: python3 app.py
```

### API use
```
curl -X POST http://127.0.0.1:5000/parse -H "Content-Type: application/json" -d '{"sentence": "saya makan dirumah"}'
```
