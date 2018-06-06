package com.mc426;

public abstract class ItemCompartilhado {
	private int id;
	private String nome;
	private static int ultimoId = 1;
	
	public ItemCompartilhado(String nome) {
		this.id = proximoId();
		this.nome = nome;
	}
	
	private static int proximoId() {
		return ultimoId++;
	}
	
	public int getId() {
		return this.id;
	}
	
	public String getNome() {
		return this.nome;
	}
}
