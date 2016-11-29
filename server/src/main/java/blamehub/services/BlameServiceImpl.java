package blamehub.services;

import blamehub.services.solr.SolrService;
import blamehub.shared.CommitConverter;
import blamehub.shared.model.CommitDoc;
import org.apache.log4j.Logger;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.response.GroupCommand;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.eclipse.jgit.revwalk.RevCommit;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.io.IOException;
import java.util.Iterator;
import java.util.List;

@Service
public class BlameServiceImpl implements BlameService{

    private static final Logger logger = Logger.getLogger(BlameService.class);

    private final RepoService repoService;
    private final SolrService solrService;

    @Inject
    public BlameServiceImpl(RepoService repoService, SolrService solrService) {
        this.repoService = repoService;
        this.solrService = solrService;
    }

    @Override
    public void scanRepo(String url, String repoUsername, String repoPassword) throws GitAPIException, IOException {
        logger.info("Scanning repository: " + url);
        Iterator<RevCommit> commits = repoService.scanRepo(url, repoUsername, repoPassword);
        List<CommitDoc> commitDocList = CommitConverter.toCommitDocs(commits);
        solrService.addCommitDocs(commitDocList);
        logger.info("Done scanning repository: " + url);
    }

    @Override
    public List<GroupCommand> search(String terms) throws IOException, SolrServerException {
        logger.info("Searching repository for: " + terms);
        return solrService.findByTerms(terms);
    }

    @Override
    public String getRepoUrl() {
        return repoService.getRepoUrl();
    }

}
