import Newsletter from '../models/Newsletter.js';
import { saveJsonSubmission } from '../utils/jsonStorage.js';

export const subscribeEmail = async (email) => {
  await saveJsonSubmission('newsletters', { email });

  const existing = await Newsletter.findOne({ email });

  if (existing) {
    if (existing.isActive) {
      const error = new Error('This email is already subscribed');
      error.statusCode = 409;
      throw error;
    }

    existing.isActive = true;
    await existing.save();
    return existing;
  }

  const subscription = await Newsletter.create({ email });
  return subscription;
};

