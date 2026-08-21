const filtered = tasks.filter(
  (task) => {
    if (
      selectedPriority &&
      task.priority !==
        selectedPriority
    ) {
      return false;
    }

    if (
      selectedStatus &&
      task.status !==
        selectedStatus
    ) {
      return false;
    }

    return true;
  },
);