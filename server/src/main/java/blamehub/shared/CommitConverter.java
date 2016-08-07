package blamehub.shared;


import blamehub.shared.model.CommitDoc;
import org.eclipse.jgit.revwalk.RevCommit;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

public class CommitConverter {

    public static CommitDoc toCommitDoc(RevCommit revCommit) {
        CommitDoc commitDoc = new CommitDoc();
        commitDoc.setId(revCommit.getName());
        commitDoc.setDate_dt(Date.from(Instant.ofEpochSecond( revCommit.getCommitTime())));
        commitDoc.setName_txt_en(revCommit.getAuthorIdent().getName());
        commitDoc.setMessage(revCommit.getFullMessage());
        return commitDoc;
    }

    public static List<CommitDoc> toCommitDocs(Iterator<RevCommit> revCommits) {
        List<CommitDoc> res = new ArrayList<>();
        if(revCommits != null && revCommits.hasNext()){
            while (revCommits.hasNext()){
                res.add(toCommitDoc(revCommits.next()));
            }
        }
        return res;
    }

}
