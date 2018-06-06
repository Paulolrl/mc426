package com.mc426;

import java.util.HashMap;

public abstract class ItemCompartilhado {
	private int id;
	private String nome;
	private static int ultimoId = 1;
	private static HashMap<Integer, ItemCompartilhado> itemPorId = new HashMap<Integer, ItemCompartilhado>();

	public static ItemCompartilhado getItemPorId(int id) {
		return itemPorId.get(id);
	}

	public ItemCompartilhado(String nome) {
		this.id = proximoId();
		ItemCompartilhado.itemPorId.put(this.id, this);
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
