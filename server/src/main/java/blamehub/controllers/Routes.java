package blamehub.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *  For some reason Spring is messing with my AngularJs routing
 */

@Controller
public class Routes {

    @RequestMapping({
            "/repo",
            "/search"
    })
    public String index() {
        return "forward:/index.html";
    }
}