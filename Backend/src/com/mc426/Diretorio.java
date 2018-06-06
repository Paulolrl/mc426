package com.mc426;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class Diretorio {
	private String nome;
	private String caminho;
	private static HashMap<String, Diretorio> diretorioPorNome = new HashMap<String, Diretorio>();
	private List<ItemCompartilhado> listaItems = new ArrayList<ItemCompartilhado>();
	
	public Diretorio(String nome, String caminho) throws Exception {
		if(diretorioPorNome.containsKey(nome)) {
			throw new Exception("Ja existe um diretorio com esse nome");
		}
		this.nome = nome;
		this.caminho = caminho;
		diretorioPorNome.put(nome, this);
	}
	
	public static Diretorio getDiretorioPorNome(String nome) {
		return diretorioPorNome.get(nome);
	}
	
	public String getNome() {
		return this.nome;
	}
	
	public String getCaminho() {
		return this.caminho;
	}
	
	public List<ItemCompartilhado> getItems() {
		return this.listaItems;
	}
	
	public void adicionarRepo(String nome, String chaveAutenticacao, String link) {
		Repositorio novoRepo = new Repositorio(nome, chaveAutenticacao, link);
		listaItems.add(novoRepo);
	}
	
	public void adicionarDocGoogle(String nome, String chaveAutenticacao, String link) {
		DocumentoGoogle novoDoc = new DocumentoGoogle(nome, chaveAutenticacao, link);
		listaItems.add(novoDoc);
	}
	
	public void adicionarArquivo(String nome, String caminho) {
		Arquivo novoArq = new Arquivo(nome, caminho);
		listaItems.add(novoArq);
	}
}

