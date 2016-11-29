package blamehub.services;

import blamehub.shared.BlameConstants;
import org.apache.log4j.Logger;
import org.eclipse.jgit.api.CloneCommand;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.PullResult;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.eclipse.jgit.internal.storage.file.FileRepository;
import org.eclipse.jgit.lib.ObjectId;
import org.eclipse.jgit.lib.Repository;
import org.eclipse.jgit.revwalk.RevCommit;
import org.eclipse.jgit.revwalk.RevWalk;
import org.eclipse.jgit.transport.CredentialsProvider;
import org.eclipse.jgit.transport.UsernamePasswordCredentialsProvider;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
public class RepoServiceImpl implements RepoService{

    private static final Logger logger = Logger.getLogger(RepoService.class);
    private static String REPO_URL;

    @Override
    public Iterator<RevCommit> scanRepo(String url, String repoUsername, String repoPassword) throws GitAPIException, IOException {
        File repoFolder = getRepoLocationByOS();
        if (!repoFolder.exists()){
            logger.info("No local repository found. Cloning one into " + repoFolder.getAbsolutePath());
            return cloneRepo(url, repoUsername, repoPassword, repoFolder);
        } else {
            logger.info("Local repository was found in " + repoFolder.getAbsolutePath() +". Pulling update from Git.");
            return pullRepo(repoFolder, repoUsername, repoPassword);
        }
    }

    @Override
    public String getRepoUrl() {
        return REPO_URL;
    }

    private Iterator<RevCommit> pullRepo(File repoFolder, String repoUsername, String repoPassword) throws IOException, GitAPIException {
        Repository repo = new FileRepository(repoFolder + "/.git");
        Git git = new Git(repo);
        if(repoUsername != null && repoPassword != null){
            CredentialsProvider.setDefault(new UsernamePasswordCredentialsProvider(repoUsername, repoPassword));
        }
        PullResult pullResult = git.pull().call();
        ObjectId[] mergedCommits = pullResult.getMergeResult().getMergedCommits();
        return parseCommits(repo, mergedCommits);
    }

    private Iterator<RevCommit> parseCommits(Repository repo, ObjectId[] mergedCommits) throws IOException {
        RevWalk revWalk = new RevWalk(repo);
        List<RevCommit> res = new ArrayList<>();
        for (ObjectId mergedCommit : mergedCommits) {
            res.add(revWalk.parseCommit(mergedCommit));
        }
        return res.iterator();
    }

    private Iterator<RevCommit> cloneRepo(String url, String repoUsername, String repoPassword, File repoFolder) throws GitAPIException {
        REPO_URL = url;
        repoFolder.mkdirs();
        CloneCommand cloneCommand = generateCloneCommand(url, repoUsername, repoPassword, repoFolder);
        Git cloned = cloneCommand.call();
        return cloned.log().call().iterator(); // only head
    }

    private CloneCommand generateCloneCommand(String url, String repoUsername, String repoPassword, File repoFolder) {
        CloneCommand cloneCommand = Git.cloneRepository()
                .setURI(url)
                .setDirectory(repoFolder);

        if(repoUsername != null && repoPassword != null){
            cloneCommand.setCredentialsProvider(
                    new UsernamePasswordCredentialsProvider(repoUsername, repoPassword));
        }
        return cloneCommand;
    }

    private File getRepoLocationByOS() {
        String tmpFolder = System.getProperty("java.io.tmpdir");
        return new File(tmpFolder + "/" + BlameConstants.NAME);
    }
}
