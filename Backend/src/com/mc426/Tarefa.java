package com.mc426;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

public class Tarefa {

	private static HashMap<Integer, Tarefa> tarefaPorId = new HashMap<Integer, Tarefa>();
	private List<Feedback> feedbacks = new ArrayList<Feedback>();
	
	private static int ultimoId = 1;
	public static Tarefa getPorId(int id) {
		return Tarefa.tarefaPorId.get(id);
	}
	
	private static int proximoId() {
		return ultimoId++;
	}
	
	private List<Tarefa> dependencias;

	private String descricao;
	
	private int id;
	
	private String nome;
	
	private Date prazo;
	
	private Status progresso;

	private List<String> tags;

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

	public List<Tarefa> getDependencias() {
		return dependencias;
	}
	public String getDescricao() {
		return descricao;
	}
	public int getId() {
		return id;
	}
	public String getNome() {
		return nome;
	}
	public Date getPrazo() {
		return prazo;
	}
	public Status getProgresso() {
		return progresso;
	}
	public List<String> getTags() {
		return tags;
	}
	
	public void adicionarFeedback(Usuario autor, int nota, String comentario) {
		Feedback feedback = new Feedback(autor, nota, comentario);
		feedbacks.add(feedback);
	}
}
