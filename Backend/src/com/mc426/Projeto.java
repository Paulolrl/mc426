package com.mc426;

import java.util.Date;
import java.util.HashMap;
import java.util.List;

public class Projeto {
	private int id;
	private String nome;
	private String descricao;
	private Date prazo;
	private Gerente dono;
	private List<Tarefa> listaTarefas;
	private List<Equipe> listaEquipes;
	
	private static int ultimoId = 1;
	private static HashMap<Integer, Projeto> projetoPorId = new HashMap<Integer, Projeto>();
	
	public Projeto(String nome, String descricao, Date prazo, Gerente dono) {
		this.id = Projeto.proximoId();
		this.nome = nome;
		this.descricao = descricao;
		this.prazo = prazo;
		this.dono = dono;
		Projeto.projetoPorId.put(this.id, this);
	}
	
	public static Projeto getPorId(int id) {
		return Projeto.projetoPorId.get(id);
    }	
	
	private static int proximoId() {
		return ultimoId++;
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
	
	public Gerente getDono() {
		return dono;
	}

	public void criarTarefa(String nomeTarefa, String descricao, Date prazo, Date duracao,
			List<Usuario> responsaveis, List<Tarefa> dependencias, List<String> tags) throws Exception{
		Tarefa novaTarefa = new Tarefa(nomeTarefa, descricao, prazo, tags, dependencias);
		
		for (Usuario usuario : responsaveis) {
			usuario.atribuiResponsabilidade(novaTarefa);
		}
		
		this.listaTarefas.add(novaTarefa);
	}
	
	
	public void adicionarEquipe(Equipe equipe) {
		this.listaEquipes.add(equipe);
	}
	
	public void removerEquipe(Equipe equipe) {
		this.listaEquipes.remove(equipe);
	}
	
	public void removerProjeto() throws Exception {
		for(Tarefa tarefa: listaTarefas) {
			tarefa.removerTarefa();
		}
		for(Equipe equipe: listaEquipes) {
			equipe.removerProjeto(this);
		}
		projetoPorId.remove(this.getId());
	}
	 
}
