package com.mc426;

import java.util.Date;
import java.util.List;

public class Gerente extends Usuario {

	public Gerente(String userName, String senha, String nome) throws Exception {
		super(userName, senha, nome);
	}

	public Equipe criarNovaEquipe(String nome, List<Usuario> integrantes, Gerente dono) throws Exception {
		return new Equipe(nome, integrantes, dono);
	}

	public Projeto criarNovoProjeto(String nome, String descricao, String prazo, Gerente dono, List<Equipe> equipes)
			throws Exception {
		Projeto novoProjeto = new Projeto(nome, descricao, prazo, dono);
		for (Equipe equipe : equipes) {
			equipe.adicionarProjeto(novoProjeto);
		}
		return novoProjeto;
	}

	public void removerProjeto(Projeto projeto) throws Exception {
		if (projeto.getDono().equals(this)) {
			projeto.removerProjeto();
		}
	}

}
