package com.mc426;

public class Arquivo extends ItemCompartilhado{

	private String caminho;
	
	public Arquivo(String nome, String caminho) {
		super(nome);
		this.caminho = caminho;
	}
	
	public String getCaminho() {
		return this.caminho;
	}
}
