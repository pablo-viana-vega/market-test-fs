<?php
// Define o caminho para o arquivo index.html
$indexPath = __DIR__ . '/index.html';

// Verifica se o arquivo index.html existe
if (file_exists($indexPath)) {
    // Lê o conteúdo do arquivo index.html
    $html = file_get_contents($indexPath);

    // Exibe o conteúdo do arquivo
    echo $html;
} else {
    // Exibe uma mensagem de erro se o arquivo não existir
    echo 'Arquivo não encontrado.';
}
