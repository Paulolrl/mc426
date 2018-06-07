package com.mc426;

import org.json.JSONObject;

public class Arquivo extends ItemCompartilhado{

	private String caminho;
	
	public Arquivo(String nome, String caminho) {
		super(nome);
		this.caminho = caminho;
	}
	
	public String getCaminho() {
		return this.caminho;
	}

	@Override
	public JSONObject toJson() {
		JSONObject retv = new JSONObject();
		retv.put("nome", this.nome);
		retv.put("id", this.id);
		retv.put("caminho", this.caminho);
		retv.put("tipo", "arquivo");
		return retv;
	}
}
