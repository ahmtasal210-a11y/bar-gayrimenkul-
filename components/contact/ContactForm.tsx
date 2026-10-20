'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { Send, CheckCircle2, MessageCircle } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/config';
import { cn } from '@/lib/utils';

const SERVICE_KEYS = ['buy', 'sell', 'rent', 'consulting', 'other'] as const;

/**
 * İletişim formu — Zod ile doğrular, gönderince talebi WhatsApp'a yönlendirir
 * (backend yok). Türkçe telefon formatına toleranslı regex kullanır.
 */
export function ContactForm({ defaultService }: { defaultService?: (typeof SERVICE_KEYS)[number] }) {
  const t = useTranslations('contact.form');
  const [sent, setSent] = useState(false);

  // Çeviri tabanlı doğrulama şeması.
  const schema = z.object({
    name: z.string().min(1, t('errors.nameRequired')).min(2, t('errors.nameMin')),
    phone: z
      .string()
      .min(1, t('errors.phoneRequired'))
      .regex(/^[+0-9\s()-]{7,20}$/, t('errors.phoneInvalid')),
    email: z.union([z.string().email(t('errors.emailInvalid')), z.literal('')]).optional(),
    service: z.enum(SERVICE_KEYS, { errorMap: () => ({ message: t('errors.serviceRequired') }) }),
    message: z.string().min(1, t('errors.messageRequired')).min(10, t('errors.messageMin')),
  });

  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { service: defaultService ?? undefined },
  });

  function onSubmit(data: FormValues) {
    // Talebi WhatsApp mesajına dönüştür ve yeni sekmede aç.
    const text = t('whatsappTemplate', {
      name: data.name,
      phone: data.phone,
      email: data.email || '-',
      service: t(`services.${data.service}`),
      message: data.message,
    });
    window.open(buildWhatsAppLink(text), '_blank', 'noopener,noreferrer');
    setSent(true);
  }

  const fieldClass =
    'h-12 w-full rounded-xl border border-white/10 bg-ink-900/80 px-4 text-sm text-white placeholder:text-slate-500 outline-none transition-colors focus:border-accent-500/60 focus:ring-1 focus:ring-accent-500/40';
  const labelClass = 'mb-1.5 block text-sm font-medium text-slate-300';
  const errorClass = 'mt-1.5 text-xs text-red-400';

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-accent-500/30 bg-accent-500/5 p-10 text-center">
        <CheckCircle2 className="h-14 w-14 text-accent-400" aria-hidden />
        <p className="mt-4 font-display text-lg font-semibold text-white">{t('success')}</p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 text-sm font-medium text-accent-300 underline-offset-4 hover:underline"
        >
          {t('title')}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="name">
            {t('name')}
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            className={cn(fieldClass, errors.name && 'border-red-500/60')}
            placeholder={t('namePlaceholder')}
            aria-invalid={!!errors.name}
            {...register('name')}
          />
          {errors.name && <p className={errorClass}>{errors.name.message}</p>}
        </div>

        <div>
          <label className={labelClass} htmlFor="phone">
            {t('phone')}
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            className={cn(fieldClass, errors.phone && 'border-red-500/60')}
            placeholder={t('phonePlaceholder')}
            aria-invalid={!!errors.phone}
            {...register('phone')}
          />
          {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="email">
            {t('email')}
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className={cn(fieldClass, errors.email && 'border-red-500/60')}
            placeholder={t('emailPlaceholder')}
            aria-invalid={!!errors.email}
            {...register('email')}
          />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>

        <div>
          <label className={labelClass} htmlFor="service">
            {t('service')}
          </label>
          <select
            id="service"
            className={cn(fieldClass, '[color-scheme:dark]', errors.service && 'border-red-500/60')}
            defaultValue={defaultService ?? ''}
            aria-invalid={!!errors.service}
            {...register('service')}
          >
            <option value="" disabled>
              {t('servicePlaceholder')}
            </option>
            {SERVICE_KEYS.map((key) => (
              <option key={key} value={key}>
                {t(`services.${key}`)}
              </option>
            ))}
          </select>
          {errors.service && <p className={errorClass}>{errors.service.message}</p>}
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="message">
          {t('message')}
        </label>
        <textarea
          id="message"
          rows={5}
          className={cn(
            fieldClass,
            'h-auto resize-none py-3',
            errors.message && 'border-red-500/60',
          )}
          placeholder={t('messagePlaceholder')}
          aria-invalid={!!errors.message}
          {...register('message')}
        />
        {errors.message && <p className={errorClass}>{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-accent-500 px-6 text-sm font-semibold text-ink-950 transition-all hover:bg-accent-400 hover:shadow-glow disabled:opacity-60 sm:w-auto"
      >
        {isSubmitting ? (
          t('submitting')
        ) : (
          <>
            <MessageCircle className="h-5 w-5" aria-hidden />
            {t('submit')}
            <Send className="h-4 w-4" aria-hidden />
          </>
        )}
      </button>
    </form>
  );
}
