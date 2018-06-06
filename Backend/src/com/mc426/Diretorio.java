package com.mc426;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class Diretorio {

	private static HashMap<Integer, Diretorio> diretorioPorNome = new HashMap<Integer, Diretorio>();

	private static int ultimoId = 1;

	public static Diretorio getDiretorioPorId(int id) {
		return diretorioPorNome.get(id);
	}

	private static int proximoId() {
		return Diretorio.ultimoId++;
	}

	private int id;

	private List<ItemCompartilhado> listaItems = new ArrayList<ItemCompartilhado>();

	private String nome;

	public Diretorio(String nome) throws Exception {
		this.nome = nome;
		this.id = Diretorio.proximoId();
		diretorioPorNome.put(this.id, this);
	}

	public void adicionarArquivo(String nome, String caminho) {
		Arquivo novoArq = new Arquivo(nome, caminho);
		listaItems.add(novoArq);
	}

	public void adicionarDocGoogle(String nome, String chaveAutenticacao, String link) {
		DocumentoGoogle novoDoc = new DocumentoGoogle(nome, chaveAutenticacao, link);
		listaItems.add(novoDoc);
	}

	public void adicionarRepo(String nome, String chaveAutenticacao, String link) {
		Repositorio novoRepo = new Repositorio(nome, chaveAutenticacao, link);
		listaItems.add(novoRepo);
	}

	public String getCaminho() {
		return this.caminho;
	}

	public List<ItemCompartilhado> getItems() {
		return this.listaItems;
	}

	public String getNome() {
		return this.nome;
	}
}
