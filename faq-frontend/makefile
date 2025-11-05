container:
	docker build --no-cache -t faq-frontend . && \
	docker run -d --env-file .env -p 3000:3000 --restart always faq-frontend

