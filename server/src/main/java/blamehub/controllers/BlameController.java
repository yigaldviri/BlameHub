package blamehub.controllers;

import blamehub.services.BlameService;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.response.GroupCommand;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.io.IOException;
import java.util.List;

import static blamehub.shared.BlameConstants.*;

@RestController()
public class BlameController {

    private BlameService blameService;

    @Inject
    public BlameController(BlameService blameService) {
        this.blameService = blameService;
    }

    @RequestMapping(method = RequestMethod.POST, value = REPO_SCAN)
    public void repoScan(@RequestParam(value = REPO_URL, required = true) final String repoUrl,
                           @RequestParam(value = REPO_USER_NAME, required = false) final String repoUsername,
                           @RequestParam(value = REPO_PASSWORD, required = false) final String repoPassword) throws GitAPIException, IOException {
        blameService.scanRepo(repoUrl, repoUsername, repoPassword);
    }

    @CrossOrigin
    @RequestMapping(method = RequestMethod.GET, value = SEARCH)
    public List<GroupCommand> search(@RequestParam(value = TERMS, required = true) final String terms) throws IOException, SolrServerException {
        return blameService.search(terms);
    }
}