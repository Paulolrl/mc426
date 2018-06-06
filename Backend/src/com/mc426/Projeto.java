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
	private Gerente dono;
	private int id;
	private List<Equipe> listaEquipes;

	private List<Tarefa> listaTarefas;
	private String nome;

	private Date prazo;

	public Projeto(String nome, String descricao, Date prazo, Gerente dono) {
		this.id = Projeto.proximoId();
		this.nome = nome;
		this.descricao = descricao;
		this.prazo = prazo;
		this.dono = dono;
		this.listaTarefas = new ArrayList<Tarefa>();
		this.listaEquipes = new ArrayList<Equipe>();
		Projeto.projetoPorId.put(this.id, this);
	}

	public void adicionarEquipe(Equipe equipe) {
		this.listaEquipes.add(equipe);
	}

	public void criarTarefa(String nomeTarefa, String descricao, Date prazo, Date duracao, List<Usuario> responsaveis,
			List<Tarefa> dependencias, List<String> tags) throws Exception {
		Tarefa novaTarefa = new Tarefa(nomeTarefa, descricao, prazo, tags, dependencias, responsaveis);

		for (Usuario usuario : responsaveis) {
			usuario.atribuiResponsabilidade(novaTarefa);
		}

		this.listaTarefas.add(novaTarefa);
	}

	public String getDescricao() {
		return descricao;
	}

	public Gerente getDono() {
		return dono;
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
		return "{\n\tid: " + id + "\n\tnome: " + nome + "\n\tdescricao: " + descricao + "\n\tprazo: " + prazo
				+ "\n\tdono: " + dono.getUserName() + "\n\tlistaTarefas: "
				+ listaTarefas.stream().mapToInt(x -> x.getId()).boxed().collect(Collectors.toList())
				+ "\n\tlistaEquipes: "
				+ listaEquipes.stream().mapToInt(x -> x.getId()).boxed().collect(Collectors.toList()) + "\n}";
	}

}
