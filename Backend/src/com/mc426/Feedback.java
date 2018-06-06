package com.mc426;

public class Feedback {
	private Usuario autor;

	private String comentario;
	private int nota;

	public Feedback(Usuario autor, int nota, String comentario) {
		this.autor = autor;
		this.nota = nota;
		this.comentario = comentario;
	}

	public Usuario getAutor() {
		return this.autor;
	}

	public String getComentario() {
		return this.comentario;
	}

	public int getNota() {
		return this.nota;
	}

	@Override
	public String toString() {
		return "{\n\tautor: " + autor.getUserName() + "\n\tcomentario: " + comentario + "\n\tnota: " + nota + "\n}";
	}
}
