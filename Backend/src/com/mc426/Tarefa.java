package com.mc426;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

public class Tarefa {

	private static HashMap<Integer, Tarefa> tarefaPorId = new HashMap<Integer, Tarefa>();

	private static int ultimoId = 1;

	public static Tarefa getPorId(int id) {
		return Tarefa.tarefaPorId.get(id);
	}

	private static int proximoId() {
		return ultimoId++;
	}

	private List<Tarefa> dependencias;

	private String descricao;

	private List<Feedback> feedbacks;

	private int id;

	private String nome;

	private String prazo;

	private Status progresso;

	private List<Usuario> responsaveis;

	private List<String> tags;

	private Projeto projeto;

	public Projeto getProjeto() {
		return projeto;
	}

	public Tarefa(String nome, String descricao, String prazo, Projeto projeto, List<String> tags,
			List<Tarefa> dependencias, List<Usuario> responsaveis) throws Exception {
		super();
		this.id = Tarefa.proximoId();
		this.nome = nome;
		this.descricao = descricao;
		this.prazo = prazo;
		this.tags = tags;
		this.dependencias = dependencias;
		this.projeto = projeto;
		this.progresso = new Status("Em espera", 0);
		this.feedbacks = new ArrayList<Feedback>();
		for (Usuario responsavel : responsaveis) {
			responsavel.atribuiResponsabilidade(this);
		}
		this.responsaveis = responsaveis;
		Tarefa.tarefaPorId.put(this.id, this);
	}

	public void adicionarFeedback(Usuario autor, int nota, String comentario) {
		Feedback feedback = new Feedback(autor, nota, comentario);
		feedbacks.add(feedback);
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

	public String getPrazo() {
		return prazo;
	}

	public Status getProgresso() {
		return progresso;
	}

	public List<String> getTags() {
		return tags;
	}

	public void removerTarefa() throws Exception {
		for (Usuario responsavel : responsaveis) {
			responsavel.removerResponsabilidade(this);
		}
		tarefaPorId.remove(this.getId());
	}

	@Override
	public String toString() {
		return "{\n\tdependencias: "
				+ dependencias.stream().map(x -> "/projetos/" + x.getProjeto().getId() + "/tarefas/" + x.getId())
						.collect(Collectors.toList())
				+ ",\n\tdescricao: \"" + descricao + "\",\n\tfeedbacks: " + feedbacks + ",\n\tid: " + id + ",\n\tnome: \""
				+ nome + "\",\n\tprazo: \"" + prazo + "\",\n\tprogresso: " + progresso + ",\n\tresponsaveis: "
				+ responsaveis.stream().map(x -> "/usuarios/" + x.getUserName()).collect(Collectors.toList())
				+ ",\n\ttags: " + tags + "\n}";
	}

}
