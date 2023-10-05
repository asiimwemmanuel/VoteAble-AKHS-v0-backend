const router = require("express").Router();
const {
  createPoll,
  deletePoll,
  vote,
  myPolls,
  votedUsers,
  findPoll,
  donate,
  checkout,
  webhook,
  createPollChain,
  viewPollChains,
  viewPollChainPolls,
  deletePollChain,
  get_user
} = require("../controllers/controller.js");

router.post('/create-checkout-session/:price', checkout);
router.post('/v1/create-poll-chain', createPollChain);
router.get('/v1/my-poll-chains', viewPollChains);
router.get('/v1/poll-chain-polls/:id', viewPollChainPolls);
router.post('/webhook', webhook);
router.post("/v1/create-poll", createPoll);
router.delete("/v1/delete-poll/:pollId", deletePoll);
router.delete("/v1/delete-poll-chain/:id", deletePollChain);
router.post("/v1/vote/:pollId", vote);
router.post("/v1/myPolls", myPolls);
router.get("/v1/poll/:pollId", findPoll);
router.get("/v1/voted-users/:pollId", votedUsers);
router.post("/v1/create-checkout-session", donate);
router.post('/v1/user', get_user);

module.exports = router;
