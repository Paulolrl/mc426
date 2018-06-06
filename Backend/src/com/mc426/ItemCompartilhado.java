package com.mc426;

import java.util.HashMap;

public abstract class ItemCompartilhado {
	private static HashMap<Integer, ItemCompartilhado> itemPorId = new HashMap<Integer, ItemCompartilhado>();
	private static int ultimoId = 1;

	public static ItemCompartilhado getItemPorId(int id) {
		return itemPorId.get(id);
	}

	private static int proximoId() {
		return ultimoId++;
	}

	private int id;

	private String nome;

	public ItemCompartilhado(String nome) {
		this.id = proximoId();
		ItemCompartilhado.itemPorId.put(this.id, this);
		this.nome = nome;
	}

	public int getId() {
		return this.id;
	}

	public String getNome() {
		return this.nome;
	}
}
