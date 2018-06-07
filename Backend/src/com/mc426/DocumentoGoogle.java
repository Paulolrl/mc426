package com.mc426;

import org.json.JSONObject;

public class DocumentoGoogle extends ItemCompartilhado{
	private String chaveAutenticacao;
	private String link;
	
	public DocumentoGoogle(String nome, String chaveAutenticacao, String link) {
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

	@Override
	public JSONObject toJson() {
		JSONObject retv = new JSONObject();
		retv.put("nome", this.nome);
		retv.put("id", this.id);
		retv.put("link", this.link);
		retv.put("tipo", "documentoGoogle");
		return retv;
	}
}
