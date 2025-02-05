# Usar a imagem base do Python
FROM python:3.11

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar apenas o requirements.txt primeiro (para otimizar cache)
COPY requirements.txt .

# Instalar as dependências
RUN pip install --no-cache-dir -r requirements.txt

# Agora copiar todo o restante do projeto
COPY . .

# Expor a porta da API
EXPOSE 8000

# Comando para rodar a aplicação
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
