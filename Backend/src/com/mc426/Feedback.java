package com.mc426;

public class Feedback {
	private Usuario autor;
	private int nota;
	private String comentario;
	
	public Feedback(Usuario autor, int nota, String comentario) {
		this.autor = autor;
		this.nota = nota;
		this.comentario = comentario;
	}
	
	public Usuario getAutor() {
		return this.autor;
	}
	
	public int getNota() {
		return this.nota;
	}
	
	public String getComentario() {
		return this.comentario;
	}
}
