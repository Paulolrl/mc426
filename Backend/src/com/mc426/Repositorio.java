package com.mc426;

public class Repositorio extends ItemCompartilhado{
	private String chaveAutenticacao;
	private String link;
	
	public Repositorio(String nome, String chaveAutenticacao, String link) {
		super(nome);
		this.chaveAutenticacao = chaveAutenticacao;
		this.link = link;
	}
	
	public String getChaveAutenticacao() {
		return this.chaveAutenticacao;
	}
	
	public String getLink() {
		return this.link;
	}
}