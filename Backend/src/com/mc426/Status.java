package com.mc426;

import org.json.JSONObject;

public class Status {
	private int porcentagem;
	private String texto;

	public Status(String texto, int porcentagem) {
		super();
		this.texto = texto;
		this.porcentagem = porcentagem;
	}

	public int getPorcentagem() {
		return porcentagem;
	}

	public String getTexto() {
		return texto;
	}

	public void setPorcentagem(int porcentagem) {
		this.porcentagem = porcentagem;
	}

	public void setTexto(String texto) {
		this.texto = texto;
	}
	@Override
	public String toString() {
		return "{\n\tporcentagem: " + porcentagem + ",\n\ttexto: \"" + texto + "\"\n}";
	}

	public JSONObject toJson() {
		JSONObject retv = new JSONObject();
		retv.put("porcentagem", this.porcentagem);
		retv.put("texto", this.texto);
		return retv;
	}
}
