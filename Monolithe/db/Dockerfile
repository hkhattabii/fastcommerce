FROM postgres
ENV POSTGRES_PASSWORD=root
ENV POSTGRES_DB=postgres
COPY dump.sql /docker-entrypoint-initdb.d/
EXPOSE 5432