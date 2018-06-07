package com.mc426;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

public class Projeto {
	private static HashMap<Integer, Projeto> projetoPorId = new HashMap<Integer, Projeto>();

	private static int ultimoId = 1;

	public static Projeto getPorId(int id) {
		return Projeto.projetoPorId.get(id);
	}

	private static int proximoId() {
		return ultimoId++;
	}

	private String descricao;
	private Diretorio diretorio;
	private Gerente dono;
	private int id;

	private List<Equipe> listaEquipes;
	private List<Tarefa> listaTarefas;

	private String nome;
	private String prazo;

	public Projeto(String nome, String descricao, String prazo, Gerente dono) {
		this.id = Projeto.proximoId();
		this.nome = nome;
		this.descricao = descricao;
		this.prazo = prazo;
		this.dono = dono;
		this.diretorio = new Diretorio("root");
		this.listaTarefas = new ArrayList<Tarefa>();
		this.listaEquipes = new ArrayList<Equipe>();
		Projeto.projetoPorId.put(this.id, this);
	}

	public void adicionarEquipe(Equipe equipe) {
		this.listaEquipes.add(equipe);
	}

	public void criarTarefa(String nomeTarefa, String descricao, String prazo, Date duracao, List<Usuario> responsaveis,
			List<Tarefa> dependencias, List<String> tags) throws Exception {
		Tarefa novaTarefa = new Tarefa(nomeTarefa, descricao, prazo, this, tags, dependencias, responsaveis);

		for (Usuario usuario : responsaveis) {
			usuario.atribuiResponsabilidade(novaTarefa);
		}

		this.listaTarefas.add(novaTarefa);
	}

	public String getDescricao() {
		return descricao;
	}

	public Diretorio getDiretorio() {
		return diretorio;
	}

	public Gerente getDono() {
		return dono;
	}

	public int getId() {
		return id;
	}

	public List<Equipe> getListaEquipes() {
		return listaEquipes;
	}

	public List<Tarefa> getListaTarefas() {
		return listaTarefas;
	}

	public String getNome() {
		return nome;
	}

	public String getPrazo() {
		return prazo;
	}

	public void removerEquipe(Equipe equipe) {
		this.listaEquipes.remove(equipe);
	}

	public void removerProjeto() throws Exception {
		for (Tarefa tarefa : listaTarefas) {
			tarefa.removerTarefa();
		}
		for (Equipe equipe : listaEquipes) {
			equipe.removerProjeto(this);
		}
		projetoPorId.remove(this.getId());
	}

	@Override
	public String toString() {
		return "{\n\tid: " + id + ",\n\tnome: \"" + nome + "\",\n\tdiretorio: \"" + "/diretorios/"
				+ this.diretorio.getId() + "\",\n\tdescricao: \"" + descricao + "\",\n\tprazo: \"" + prazo
				+ "\",\n\tdono: \"" + "/usuarios/" + dono.getUserName() + "\",\n\tlistaTarefas: "
				+ listaTarefas.stream().map(x -> "/projetos/" + x.getProjeto().getId() + "/tarefas/" + x.getId())
						.collect(Collectors.toList())
				+ ",\n\tlistaEquipes: "
				+ listaEquipes.stream().map(x -> "/equipes/" + x.getId()).collect(Collectors.toList()) + "\n}";
	}

}
