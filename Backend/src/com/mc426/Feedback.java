package com.mc426;


import org.json.JSONObject;

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
		return "{\n\tautor: \"" + "/usuarios/" + autor.getUserName() + "\",\n\tcomentario: \"" + comentario
				+ "\",\n\tnota: \"" + nota + "\"\n}";
	}

	public JSONObject toJson() {
		JSONObject retv = new JSONObject();
		retv.put("autor", "/usuarios/" + this.autor.getUserName());
		retv.put("comentario", this.comentario);
		retv.put("nota", this.nota);
		return retv;
	}

}
