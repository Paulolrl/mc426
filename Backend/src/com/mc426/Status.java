package com.mc426;

public class Status {
	public Status(String texto, int porcentagem) {
		super();
		this.texto = texto;
		this.porcentagem = porcentagem;
	}

	public String getTexto() {
		return texto;
	}

	public void setTexto(String texto) {
		this.texto = texto;
	}

	public int getPorcentagem() {
		return porcentagem;
	}

	public void setPorcentagem(int porcentagem) {
		this.porcentagem = porcentagem;
	}

	private String texto;
	private int porcentagem;
}
