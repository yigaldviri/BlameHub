package blamehub.controllers;

import blamehub.services.BlameService;
import blamehub.shared.model.RepoInfo;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.response.GroupCommand;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.io.IOException;
import java.util.List;

import static blamehub.shared.BlameConstants.*;

@CrossOrigin
@RestController()
public class BlameController {

    private BlameService blameService;

    @Inject
    public BlameController(BlameService blameService) {
        this.blameService = blameService;
    }

    @RequestMapping(method = RequestMethod.POST, value = REPO_SCAN)
    public void repoScan(@RequestBody RepoInfo repoInfo) throws GitAPIException, IOException {
        blameService.scanRepo(repoInfo.getRepoUrl(), repoInfo.getRepoUsername(), repoInfo.getRepoPassword());
    }

    @RequestMapping(method = RequestMethod.GET, value = BLAME)
    public List<GroupCommand> search(@RequestParam(value = TERMS, required = true) final String terms) throws IOException, SolrServerException {
        return blameService.search(terms);
    }

    @RequestMapping(method = RequestMethod.GET, value = REPO)
    public String getRepoURL() {
        return blameService.getRepoUrl();
    }

}