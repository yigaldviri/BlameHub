package blamehub.services;

import org.eclipse.jgit.api.errors.GitAPIException;
import org.eclipse.jgit.revwalk.RevCommit;

import java.io.IOException;
import java.util.Iterator;

public interface RepoService {
    Iterator<RevCommit> scanRepo(String url, String repoUsername, String repoPassword) throws GitAPIException, IOException;

    String getRepoUrl();
}
