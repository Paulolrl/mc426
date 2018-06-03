package com.mc426;

import java.util.Date;
import java.util.HashMap;
import java.util.List;

public class Tarefa {

	public static Tarefa getPorId(int id) {
		return Tarefa.tarefaPorId.get(id);
	}
	
	private static int ultimoId = 1;
	private static HashMap<Integer, Tarefa> tarefaPorId = new HashMap<Integer, Tarefa>();
	
	private static int proximoId() {
		return ultimoId++;
	}
	
	public Tarefa(String nome, String descricao, Date prazo, List<String> tags, List<Tarefa> dependencias) {
		super();
		this.id = Tarefa.proximoId();
		Tarefa.tarefaPorId.put(this.id, this);
		this.nome = nome;
		this.descricao = descricao;
		this.prazo = prazo;
		this.tags = tags;
		this.dependencias = dependencias;
		this.progresso = new Status("Em espera", 0);
	}

	public int getId() {
		return id;
	}
	
	public String getNome() {
		return nome;
	}
	
	public String getDescricao() {
		return descricao;
	}
	
	public Date getPrazo() {
		return prazo;
	}
	
	public List<String> getTags() {
		return tags;
	}

	public List<Tarefa> getDependencias() {
		return dependencias;
	}

	public Status getProgresso() {
		return progresso;
	}

	private int id;
	private String nome;
	private String descricao;
	private Date prazo;
	private List<String> tags;
	private List<Tarefa> dependencias;
	private Status progresso;
}
