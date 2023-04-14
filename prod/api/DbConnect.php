<?php

class DbConnect
{

    private $host = '';
    private $port = '';
    private $username = '';
    private $password = '';
    private $database = '';

    public function connect()
    {
        $dotenv = parse_ini_file('../.env');
        $this->host = $dotenv['DB_HOST'];
        $this->port = $dotenv['DB_PORT'];
        $this->username = $dotenv['DB_USERNAME'];
        $this->password = $dotenv['DB_PASSWORD'];
        $this->database = $dotenv['DB_DATABASE'];
        try {
            $dsn = "pgsql:host={$this->host};port={$this->port};dbname={$this->database};user={$this->username};password={$this->password}";
            $conn = new PDO($dsn);
            //echo "Conexão bem sucedida!";
            return $conn;
        } catch (PDOException $e) {
            echo "Não foi possível conectar ao banco de dados: " . $e->getMessage();
        }
    }
}
