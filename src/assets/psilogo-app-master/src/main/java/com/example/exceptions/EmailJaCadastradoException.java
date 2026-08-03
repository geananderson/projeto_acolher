package com.example.exceptions;

public class EmailJaCadastradoException extends RuntimeException{
    public EmailJaCadastradoException() {
        super("Email já cadastrado");
    }
}
