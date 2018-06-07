package com.mc426;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.json.JSONObject;

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

	private List<ItemCompartilhado> listaItems;
	private List<Diretorio> listaSubdiretorios;

	private String nome;

	public Diretorio(String nome) {
		this.nome = nome;
		this.listaItems = new ArrayList<ItemCompartilhado>();
		this.listaSubdiretorios = new ArrayList<Diretorio>();
		this.id = Diretorio.proximoId();
		diretorioPorNome.put(this.id, this);
	}

	public void adicionarArquivo(String nome, String caminho) {
		Arquivo novoArq = new Arquivo(nome, caminho);
		listaItems.add(novoArq);
	}

	public void adicionarDiretorio(String nome) {
		this.listaSubdiretorios.add(new Diretorio(nome));
	}
	
	public void adicionarDocGoogle(String nome, String chaveAutenticacao, String link) {
		DocumentoGoogle novoDoc = new DocumentoGoogle(nome, chaveAutenticacao, link);
		listaItems.add(novoDoc);
	}

	public void adicionarRepo(String nome, String chaveAutenticacao, String link) {
		Repositorio novoRepo = new Repositorio(nome, chaveAutenticacao, link);
		listaItems.add(novoRepo);
	}

	public List<ItemCompartilhado> getItems() {
		return this.listaItems;
	}

	public List<Diretorio> getListaSubdiretorios() {
		return listaSubdiretorios;
	}

	public String getNome() {
		return this.nome;
	}

	public int getId() {
		return this.id;
	}
	
	public JSONObject toJson() {
		JSONObject retv = new JSONObject();
		retv.put("nome", this.nome);
		retv.put("id", this.id);
		retv.put("itens", this.listaItems.stream().map(x -> "/diretorios/" + this.getId() + "/itens/" + x.getId()));
		retv.put("subdiretorios", this.listaSubdiretorios.stream().map(x -> "/diretorios/" + x.getId()));
		return retv;
	}
}
