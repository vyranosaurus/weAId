package com.hackathon.socomsci.chatonly;

import com.hackathon.socomsci.service.GeminiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/triage")
public class TriageController {

    private final GeminiService geminiService;

    @Autowired
    public TriageController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @PostMapping("/chat")
    public ResponseEntity<Map<String, Object>> chat(@RequestBody Map<String, String> request) {
        String message = request.get("message");
        if (message == null || message.trim().isEmpty()) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "message is required");
            return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
        }

        String reply = geminiService.generateTriageReply(message);
        Map<String, Object> response = new HashMap<>();
        response.put("reply", reply);
        response.put("timestamp", LocalDateTime.now().toString());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @SuppressWarnings("unchecked")
    @PostMapping("/summary")
    public ResponseEntity<Map<String, Object>> summary(@RequestBody Map<String, Object> request) {
        Object qaObj = request.get("qa");
        if (!(qaObj instanceof List) || ((List<?>) qaObj).isEmpty()) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "qa is required and must be a non-empty array of {question, answer}");
            return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
        }

        List<Map<String, Object>> qa = (List<Map<String, Object>>) qaObj;
        String transcript = qa.stream()
                .map((Map<String, Object> row) -> {
                    Object q = row.get("question");
                    Object a = row.get("answer");
                    return "Q: " + (q != null ? q.toString() : "") + "\nA: " + (a != null ? a.toString() : "");
                })
                .collect(Collectors.joining("\n\n"));

        Map<String, Object> ai = geminiService.generateTriageSummary(transcript);
        Map<String, Object> response = new HashMap<>(ai);
        response.put("timestamp", LocalDateTime.now().toString());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
