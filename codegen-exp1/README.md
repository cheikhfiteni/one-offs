## code gen experiment 1

Have a hypothesis that since transformer models attend to the previous tokens in sequence, and experience "shift" in the bias of their proposal distribution based on previous chat history (which includes their own completed responses), next turn edits on the code gen task which cannot be succesfully one-shotted will be poorer than rewriting the initial prompt with language steering away from the issues that initially caused the buggy solution, due to the model attending to the negative aspects of its initial solution. It's my opinion that if this hypothesis is true it is STILL better UX to have next turn edits, but that in practice the model should be rewriting (or have the ability to toggle between/branch rewriting) the initial prompt.

Want to run an eval where my prompts are either followed up with a change suggestion, or the initial prompt is rewritten in various ways. Select from progamming problems/commits which Claude, OpenAI, etc family of SOTA models cannot successfully one-shot, run eval across various resolutions strategies. Dependency on how well the prompt rewriting is (basically APO system), but even naive copy and paste of the edit back into the initial prompt can be compared in eval results.

Creating a harness for running your own code gen bot to mess with prompting is important imo.
As a global problem